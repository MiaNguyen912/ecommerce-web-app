"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { categories, subcategories } from "@/data/categories";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setSelectedCategory, setShowMenu } from "@/store/features/appSlice";
import { useScreenType } from "@/hooks/useScreenType";
import { Category } from "@/types";

export function Menu() {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.app.selectedCategory);
  const showMenu = useAppSelector((state) => state.app.showMenu);
  const [isDesktop, isTablet, isMobile] = useScreenType();

  const handleCategoryClick = (category: Category) => {
    if (selectedCategory.name != category.name) {
      dispatch(setSelectedCategory(category));
    } else {
      window.location.href = `/catalog/${category.slug}`;
    }
  };

  const handleSubcategoryClick = () => {
    dispatch(setShowMenu(false));
  };

  // Group subcategories by type
  const groupedSubcategories = subcategories[selectedCategory.name as keyof typeof subcategories].reduce((acc, subcategory) => {
    if (!acc[subcategory.type]) {
      acc[subcategory.type] = [];
    }
    acc[subcategory.type].push(subcategory);
    return acc;
  }, {} as Record<string, (typeof subcategories)[keyof typeof subcategories]>);

  return (
    <div>
      {isDesktop ? (
        <div className={`bg-white w-full px-20 ${showMenu ? "h-fit pt-8 pb-4" : "h-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
          <nav className="flex justify-around p-4">
            {/* main categories */}
            {categories.map((category) => (
              <div key={category.id} className="w-full">
                <div className={`border-b-2 border-black w-full flex justify-center pb-4 ${category.name === selectedCategory.name ? "border-b-4" : ""} transition-all duration-300 ease-in-out`}>
                  <Button variant="ghost" onClick={() => handleCategoryClick(category)} className="text-sm hover:font-bold hover:bg-transparent">
                    {category.name}
                  </Button>
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop subcategories */}
          <div className="mt-4 px-8">
            <div className="grid grid-cols-4 gap-10">
              {/* Subcategories by type */}
              {Object.entries(groupedSubcategories).map(([type, items]) => (
                <div key={type}>
                  <p className="font-bold mb-2">{type}</p>
                  {items.map((subcategory) => (
                    <Link key={subcategory.id} href={`/catalog/${selectedCategory.slug}/${subcategory.slug}`} onClick={handleSubcategoryClick} className="block py-1 text-sm hover:underline">
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Mobile menu using Sheet
        <Sheet open={showMenu} onOpenChange={(open) => dispatch(setShowMenu(open))}>
          <SheetContent side="right" className="w-[50%] p-0 pt-8">
            <div className="h-full flex flex-col">
              {/* Main categories with dropdown */}
              <nav className="flex flex-row border-b border-gray-500">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    onClick={() => handleCategoryClick(category)}
                    className={`justify-start text-sm hover:font-bold hover:bg-black hover:text-white ${category.name === selectedCategory.name ? "font-bold bg-black text-white" : "text-gray-500"}`}>
                    {category.name}
                  </Button>
                ))}
              </nav>

              {/* Mobile subcategories */}
              {selectedCategory && (
                <div className="flex-1 overflow-y-auto">
                  <nav className="p-4">
                    {(() => {
                      let prevType = "";
                      const elements = [];
                      for (const subcategory of subcategories[selectedCategory.name as keyof typeof subcategories]) {
                        if (subcategory.type !== prevType) {
                          prevType = subcategory.type;
                          elements.push(
                            <div key={subcategory.type} className="pt-4 pb-2">
                              <p className="font-bold text-sm">{subcategory.type}</p>
                            </div>
                          );
                        }
                        elements.push(
                          <Link
                            key={subcategory.id}
                            href={`/catalog/${selectedCategory.slug}/${subcategory.slug}`}
                            onClick={handleSubcategoryClick}
                            className="block py-2 text-sm border-b border-gray-100">
                            {subcategory.name}
                          </Link>
                        );
                      }
                      return elements;
                    })()}
                  </nav>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
