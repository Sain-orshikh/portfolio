import { Download } from 'lucide-react';

export default function ResumeDownload() {
  return (
    <a
      href="/Sain-Orshikh_Nyambayar_Resume.pdf"
      download
      className="inline-flex items-center gap-2 rounded-lg border border-teal-500/30 bg-teal-500/10 px-4 py-2.5 text-sm font-medium text-teal-300 transition-colors hover:border-teal-400/60 hover:bg-teal-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      Download résumé <span className="text-xs text-slate-400">PDF</span>
    </a>
  );
}
