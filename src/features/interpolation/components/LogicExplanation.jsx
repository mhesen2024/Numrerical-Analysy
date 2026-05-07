import { FiInfo } from "react-icons/fi";

export default function LogicExplanation() {
  return (
    <details className="group relative ">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-sky-700 shadow-sm transition hover:bg-sky-50">
        <FiInfo className="text-base" />
      </summary>

      <div
        dir="rtl"
        className="absolute right-0 z-20 mt-2 w-[min(92vw,700px)] rounded-2xl border border-indigo-100 bg-white p-4 text-right shadow-2xl sm:p-5"
      >
        <h3 className="mb-2 text-base font-bold text-slate-900">شرح منطق الحل</h3>
        <ol className="list-inside list-decimal space-y-1.5 text-sm leading-7 text-slate-700">
          <li>نأخذ المدخلات: عدد النقاط، قيم x و f(x)، وقيمة الهدف target x.</li>
          <li>نحوّل القيم إلى أرقام، نحذف الصفوف غير الصالحة، ثم نرتّب حسب x.</li>
          <li>نتأكد أن قيم x غير مكررة لأن التكرار يفسد الفروق المقسومة.</li>
          <li>نفحص هل النقاط متساوية المسافات (h ثابتة تقريبًا).</li>
          <li>إذا لم تكن متساوية المسافات نستخدم Newton Divided Differences العام.</li>
          <li>إذا كانت متساوية المسافات نحدد مكان target داخل المجال.</li>
          <li>قريب من البداية: Forward Difference.</li>
          <li>قريب من النهاية: Backward Difference.</li>
          <li>في المنتصف: Centered (Stirling).</li>
          <li>نعرض الناتج النهائي Estimated f(x) في بطاقة النتيجة.</li>
        </ol>
      </div>
    </details>
  );
}
