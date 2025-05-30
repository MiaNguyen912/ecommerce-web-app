## how to run this project

- `npm i`
- `npm run dev`

## TODO

- 1. update menu according to figma prototype and A5's "Proposed Changes" part
- 2. need to add hover functionality to product image on catalog page to display product sizes + colors + add to cart button
- 3. add a Favorite icon to product items on catalog page and make a page to store favorited items
- 4. create cart page
- 5. create product page (done)
- 6. add "add to card" feature to product page and catalog page
- 7. display product's reviews and rating (checkout data/products.ts to see the data schema)
- 8. add a rating/review form to each product page
- 9. make an employee system to allow uploading new product or adjust existing product

## Libraries used

- Redux toolkit to manage components' global state
- shadcn/ui library for prebuilt UI components

## other notes

- @/app/(shop): group folder, not regular route (@/app/(shop)/cart will be accessed via http://localhost:3000/cart, not http://localhost:3000/shop/cart)

  - this helps organize routes without affecting the URL path.
  - allows to apply different layout to different groups

- set up theme with { ThemeProvider } from "next-themes". Specifi suppressHydrationWarning when use theme to suppress hydration mismatch warning
- IIFE (Immediately Invoked Function Expression): `(() => { ... })()` (defines an arrow function and calls it immediately). For example:

```
   <nav>
     {(() => {
       let prevType = "";
       const elements = [];
       for (const subcategory of subcategories[category.name as keyof typeof subcategories]) {
         if (subcategory.type !== prevType) {
           prevType = subcategory.type;
           elements.push(
             <div key={subcategory.type}>
               <p>{subcategory.type}</p>
             </div>
           );
         }
       }
       return elements;
     })()}
   </nav>
```
