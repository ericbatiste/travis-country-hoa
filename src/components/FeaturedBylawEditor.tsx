import Quill from "./Quill";
import { AdminEditorProps } from "@/utils/types";
import SubmitContentBtn from "./SubmitContentBtn";

export default function FeaturedBylawEditor({
  featuredContent,
  handleEditorChange,
  handleInputChange,
  handleSubmit,
  isPending,
  isCheckboxChecked,
  setIsCheckboxChecked,
}: AdminEditorProps) {

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-4 w-full">
        <div className="w-1/2">
          <label className="block text-lg font-bold mb-2">Section Number:</label>
          <input
            type="text"
            name="sectionNumber"
            placeholder="Bylaw section number (not displayed)."
            autoComplete="off"
            value={featuredContent?.sectionNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="w-1/2">
          <label className="block text-lg font-bold mb-2">Section Title:</label>
          <input
            type="text"
            name="sectionTitle"
            placeholder="Bylaw section title (not displayed)."
            autoComplete="off"
            value={featuredContent?.sectionTitle}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold mb-2">Add brief description:</label>
        <textarea
          name="description"
          placeholder="Text for the archive description."
          value={featuredContent?.description}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="w-full flex-grow mb-10">
        <h2 className="text-lg font-bold mb-2">Bylaw Text:</h2>
        <Quill
          value={featuredContent?.bylawText}
          onChange={content => handleEditorChange(content, 'featuredBylaw')}
        />
      </div>

      <div className="w-full flex-grow">
        <h2 className="text-lg font-bold mb-2">In a Nutshell:</h2>
        <Quill
          value={featuredContent?.inANutshell}
          onChange={content => handleEditorChange(content, 'inANutshell')}
        />
      </div>

      <div>
        <SubmitContentBtn
          onClick={handleSubmit}
          isPending={isPending}
          isChecked={isCheckboxChecked}
          setIsChecked={setIsCheckboxChecked}
          text="Submit"
          />
      </div>
    </div>
  );
}

