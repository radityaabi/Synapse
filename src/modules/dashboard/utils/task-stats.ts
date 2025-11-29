import { CATEGORY_CONFIG } from "@/modules/task/constant/task-constant";
import type { Task } from "@/modules/task/types/task";

export interface CategoryStats {
  completed: number;
  total: number;
}

export interface CategoryStatsMap {
  [category: string]: CategoryStats;
}

export function calculateCategoryStats(tasks: Task[]): CategoryStatsMap {
  return tasks.reduce<CategoryStatsMap>(
    (acc, { category = "Others", status }) => {
      const currentCategory = acc[category] || { completed: 0, total: 0 };

      return {
        ...acc,
        [category]: {
          completed: currentCategory.completed + (status === "done" ? 1 : 0),
          total: currentCategory.total + 1,
        },
      };
    },
    {},
  );
}

export function getCompletedCount(tasks: Task[]): number {
  return tasks.filter((task) => task.status === "done").length;
}

export function getCategoryColors(category: string) {
  const config =
    CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG] ||
    CATEGORY_CONFIG.Others;

  return {
    bg: config.progressBgColor,
    progress: config.progress,
  };
}
