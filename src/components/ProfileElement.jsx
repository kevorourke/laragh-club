function ProfileElement({ label, value }) {
  return (
    <li className="relative flex justify-between py-5">
      <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {label}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none">
        <div className="hidden sm:block">
          <p className="text-sm leading-6 text-gray-900">{String(value)}</p>
        </div>
      </div>
    </li>
  );
}

export default ProfileElement;
