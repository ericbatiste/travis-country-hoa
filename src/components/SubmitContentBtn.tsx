import { Loader2 } from 'lucide-react';

type SubmitContentBtnProps = {
  onClick: () => void;
  isPending: boolean;
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
  text: string;
};

export default function SubmitContentBtn({ onClick, isPending, isChecked, setIsChecked, text }: SubmitContentBtnProps) {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col gap-2 items-start mt-10">
      <label className="mb-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        The content I am about to submit has been thoroughly reviewed for errors and typos.
      </label>
      <button
        onClick={onClick}
        disabled={!isChecked || isPending}
        className={`w-full px-4 py-2 text-white rounded flex items-center justify-center ${
          !isChecked || isPending ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isPending ? <Loader2 className='animate-spin' /> : text}
      </button>
    </div>
  );
};
