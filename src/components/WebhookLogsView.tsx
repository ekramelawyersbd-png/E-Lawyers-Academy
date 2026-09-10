import React, { useState, useEffect } from 'react';
import { Activity, Send, CheckCircle2, Globe, RefreshCcw } from 'lucide-react';

interface WebhookLog {
  id: string;
  timestamp: string;
  sourceUrl: string;
  clientIp: string;
  userAgent: string;
  payload: any;
  status: string;
}

export const WebhookLogsView: React.FC = () => {
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/webhook-logs');
      const data = await res.json();
      if (data.logs) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.error('Error fetching webhook logs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const sendTestPayload = async () => {
    try {
      const payload = {
        name: "Rahim Chowdhury (Landing Page Test)",
        email: "rahim.test@example.com",
        phone: "+8801700000000",
        course: "VAT & Tax Compliance Professional Training",
        secret: "ela-test-secret-2026"
      };

      await fetch('/api/leads/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://elawyersbd-landing-test.com/promo'
        },
        body: JSON.stringify(payload)
      });
      
      // Refresh logs immediately
      fetchLogs();
    } catch (err) {
      console.error('Error sending test payload', err);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" /> Landing Page Webhook Logs
        </h3>
        <div className="flex gap-2">
          <button
            onClick={fetchLogs}
            disabled={loading}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button
            onClick={sendTestPayload}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Send Test Landing Page Payload
          </button>
        </div>
      </div>

      <div className="space-y-3 overflow-auto max-h-[500px] pr-2">
        {logs.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No webhook submissions received yet. Send a test payload to see it here.
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {log.status}
                  </span>
                  <span className="text-slate-500 font-mono">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-indigo-400 font-mono">
                  <Globe className="w-3.5 h-3.5" /> {log.sourceUrl}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <p className="text-slate-500 mb-1">Lead Details (Payload)</p>
                  <pre className="bg-slate-900 p-2 rounded-lg text-slate-300 font-mono text-[10px] overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(log.payload, null, 2)}
                  </pre>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Request Headers & Network</p>
                  <div className="bg-slate-900 p-2 rounded-lg text-slate-300 font-mono text-[10px] space-y-1">
                    <p><strong className="text-slate-400">IP:</strong> {log.clientIp}</p>
                    <p><strong className="text-slate-400">Agent:</strong> {log.userAgent}</p>
                    <p><strong className="text-slate-400">ID:</strong> {log.id}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
