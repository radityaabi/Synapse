import { useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export function TaskSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const handleSearchChange = (value: string) => {
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="relative mb-6">
      <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search tasks by title, description, or category..."
        value={searchQuery}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleSearchChange(event.target.value)
        }
        className="pr-10 pl-10"
      />
      {searchQuery && (
        <button
          onClick={() => handleSearchChange("")}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
