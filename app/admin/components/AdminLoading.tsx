export default function AdminLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-[#5e5e5e] font-medium">Loading...</span>
      </div>
    </div>
  );
}
