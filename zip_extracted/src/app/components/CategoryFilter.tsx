import { Code, Palette, Briefcase, BarChart, Camera, Music, GraduationCap, Calculator, Atom, Languages, Monitor } from 'lucide-react';
import { Category } from '../types/course';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Palette,
  Briefcase,
  BarChart,
  Camera,
  Music,
  GraduationCap,
  Calculator,
  Atom,
  Languages,
  Monitor,
};

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      <button
        onClick={() => onSelectCategory('All')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
          selectedCategory === 'All'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Ähli kurslar
      </button>
      {categories.map((category) => {
        const Icon = iconMap[category.icon];
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.nameTm)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category.nameTm
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {category.nameTm}
          </button>
        );
      })}
    </div>
  );
}