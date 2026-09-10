import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());

// In-Memory DBs for CRM Leads and Webhook Logs
const leadsDB: any[] = [];
const webhookLogsDB: any[] = [];

// Lazy-initialized Gemini Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", appName: "E-Lawyers Academy" });
});

// AI Course & Career Advisor Endpoint
app.post("/api/ai/advisor", async (req, res) => {
  try {
    const { role, goals, background, preferredTopic } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback recommendation engine if key not configured
      return res.json({
        recommendation: `Based on your profile as a ${role || "Legal/Tax Professional"}, we highly recommend starting with our "Personal Income Tax & E-Return Filing Masterclass" and "VAT & Tax Compliance Professional Training".`,
        suggestedPath: [
          "Personal Income Tax & E-Return Masterclass",
          "VAT & Tax Compliance Training",
          "Corporate Legal Compliance Course",
        ],
        careerTip: "Combining Tax Law mastery with RJSC Corporate Compliance makes you an indispensable asset for law firms, MNCs, and private practice in Bangladesh.",
        isAI: false,
      });
    }

    const prompt = `You are the Lead Academic Advisor at E-Lawyers Academy, an elite online legal and tax learning platform in Bangladesh.
User Profile:
- Role/Profession: ${role || "Legal Practitioner / Student / Business Owner"}
- Career Goals: ${goals || "Master practical income tax and corporate compliance"}
- Experience Level: ${background || "Intermediate"}
- Preferred Topic: ${preferredTopic || "Taxation & Legal Drafting"}

Provide a tailored response in valid JSON format matching this schema:
{
  "recommendation": "Comprehensive 2-3 paragraph personalized study path and career advice",
  "suggestedPath": ["Course Title 1", "Course Title 2", "Course Title 3"],
  "careerTip": "Key strategic industry tip for career growth in legal/tax in Bangladesh",
  "recommendedModules": ["Module Focus 1", "Module Focus 2", "Module Focus 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json({ ...result, isAI: true });
  } catch (error: any) {
    console.error("AI Advisor error:", error);
    res.status(500).json({ error: "Failed to generate AI advice. Please try again." });
  }
});

// Certificate Verification Endpoint
const CERTIFICATE_DB: Record<string, any> = {
  "ELA-2026-TAX-8912": {
    studentName: "Mohammad Rahman",
    courseTitle: "Personal Income Tax & E-Return Filing Masterclass",
    issueDate: "July 15, 2026",
    instructorName: "Advocate Tanvir Ahmed",
    status: "Valid & Verified",
    grade: "Distinction (94%)",
  },
  "ELA-2026-VAT-4321": {
    studentName: "Nusrat Jahan",
    courseTitle: "VAT & Tax Compliance Professional Training",
    issueDate: "June 20, 2026",
    instructorName: "Farhana Rahman, FCS",
    status: "Valid & Verified",
    grade: "Excellence (98%)",
  },
  "ELA-2026-CORP-9081": {
    studentName: "Shafiqul Islam",
    courseTitle: "Corporate Legal Compliance Course",
    issueDate: "August 01, 2026",
    instructorName: "Barrister Rafiqul Hossain",
    status: "Valid & Verified",
    grade: "Passed with Honors (91%)",
  },
};

app.get("/api/certificates/verify/:certId", (req, res) => {
  const certId = req.params.certId.toUpperCase().trim();
  const cert = CERTIFICATE_DB[certId];

  if (cert) {
    res.json({ verified: true, certificateId: certId, ...cert });
  } else {
    res.json({
      verified: false,
      certificateId: certId,
      message: "Certificate ID not found in E-Lawyers Academy central registry.",
    });
  }
});

// Webhook endpoint for external landing pages
app.post("/api/leads/webhook", (req, res) => {
  const { name, email, phone, course, secret } = req.body;
  const sourceUrl = req.headers.referer || req.headers.origin || "Unknown Origin";
  const clientIp = req.ip || req.socket.remoteAddress || "Unknown IP";
  const userAgent = req.headers["user-agent"] || "Unknown User Agent";

  // Validate secret key
  const VALID_SECRET = process.env.WEBHOOK_SECRET || "ela-test-secret-2026";
  if (secret !== VALID_SECRET) {
    return res.status(401).json({ error: "Unauthorized: Invalid secret key" });
  }

  // Create lead
  const newLead = {
    id: `lead_${Date.now()}`,
    name,
    email,
    phone,
    course: course || "General Inquiry",
    source: "Landing Page Webhook",
    createdAt: new Date().toISOString(),
    status: "New",
  };
  leadsDB.push(newLead);

  // Log webhook
  const newLog = {
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    sourceUrl,
    clientIp,
    userAgent,
    payload: req.body,
    status: "Success",
  };
  webhookLogsDB.push(newLog);

  console.log(`[Webhook Received] Lead added: ${name} (${email}) from ${sourceUrl}`);
  res.json({ success: true, message: "Lead successfully recorded in CRM." });
});

// Endpoint to fetch webhook logs (for admin panel)
app.get("/api/webhook-logs", (req, res) => {
  res.json({ logs: [...webhookLogsDB].reverse().slice(0, 50) });
});

// Contact Inquiry Submission Endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required." });
  }
  // Log inquiry
  console.log(`[Contact Form Inquiry] From: ${name} (${email}, ${phone}): ${message}`);
  res.json({ success: true, message: "Thank you! Our admission team will contact you within 24 hours." });
});

// Setup Vite or Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`E-Lawyers Academy Server running on http://localhost:${PORT}`);
  });
}

startServer();
