import { Download } from "lucide-react";

export default function FileAttachment() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] sm:max-w-[60%] bg-[#1c1f26] rounded-2xl rounded-bl-sm overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <div className="w-9 h-9 rounded-lg bg-rose-500/15 flex items-center justify-center shrink-0">
            <span className="text-rose-400 text-[10px] font-bold">PDF</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-100 truncate">
              Q3_Metrics_Report.pdf
            </p>
            <p className="text-[11px] text-gray-500">2.4 MB · PDF Document</p>
          </div>
          <Download size={16} className="text-gray-400 shrink-0" />
        </div>
        <div className="px-4 py-2.5">
          <p className="text-sm text-gray-100">
            Here you go. The quarterly report looks solid. Let's review
            tomorrow.
          </p>
          <div className="text-[10px] text-gray-500 mt-1 text-right">
            10:42 AM
          </div>
        </div>
      </div>
    </div>
  );
}