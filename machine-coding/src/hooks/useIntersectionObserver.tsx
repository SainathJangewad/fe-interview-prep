import { useEffect, useState } from "react";

export const useIntersectionObserver = (
    ref: React.RefObject<Element>, // Ensures correct type
    options: IntersectionObserverInit
) => {
    const [intersectingEntry, setIntersectingEntry] = useState<IntersectionObserverEntry | null>(null);

    useEffect(() => {
        // if no dom element is present or 'window' is not present then simply return 
        if (!ref.current || typeof IntersectionObserver !== "function") return;

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIntersectingEntry(entry);
        }, options);


        observer.observe(ref.current); // ✅ Fix: Use `ref.current`

        return () => observer.disconnect();
    }, [ref, options]);

    return intersectingEntry;
};


/*

📌 **IntersectionObserver Options Explained**

🔹 `root`: Defines the viewport (scrolling container) used to check element visibility.
   - `null` → Uses the **browser viewport** as the default viewport.
   - `HTMLElement` → Uses a **specific container** as the viewport (e.g., a scrollable div).
   - If `root` is set to an element, **intersections will be calculated relative to that element instead of the browser window**.

   ✅ Example:
   ```tsx
   const containerRef = useRef(null);
   const options = useMemo(() => ({
     root: containerRef.current, // Uses a specific div as the observer’s viewport
     rootMargin: '10px',
     threshold: 0.5
   }), []);

🔹 `rootMargin`: Expands/shrinks the observer's bounding box.
   - `'10px'` → Fires **10px before** the element enters.
   - `'-20px'` → Fires **when 20px inside** the viewport.
   - `'50px 20px 30px 10px'` → Top, Right, Bottom, Left margin.

🔹 `threshold`: Defines when the observer triggers (based on visibility %).
   - `0` → Fires **as soon as any part** is visible.
   - `0.5` → Fires **when 50%** of the element is visible.
   - `1` → Fires **only when fully visible**.
   - `[0, 0.5, 1]` → Fires at **0%, 50%, and 100% visibility**.

🔹 **Why `useMemo`?**
   - Prevents re-creating the `options` object on each render.
   - Optimizes performance when passing it to `useIntersectionObserver`.

✅ Example usage:
```tsx
const options = useMemo(() => ({
  root: null,
  rootMargin: '10px',
  threshold: 0.5
}), []);


*/

// ------------------------------------------------------------------------------------------------
/*
📌 **Use Cases of `IntersectionObserver` Hook** 🚀  

The `IntersectionObserver` API helps detect when an element enters or exits the viewport.  

---

### **1️⃣ Lazy Loading Images**  
Load images only when they are about to appear on the screen.  

```tsx
const imgRef = useRef(null);
const entry = useIntersectionObserver(imgRef, { threshold: 0.2 });

return (
  <img
    ref={imgRef}
    src={entry?.isIntersecting ? 'high-res.jpg' : 'placeholder.jpg'}
    alt="Lazy Loaded"
  />
);
------
2️⃣ Infinite Scrolling (Load More Data on Scroll)
Trigger an API call when the user reaches the bottom of a list.
const listEndRef = useRef(null);
const entry = useIntersectionObserver(listEndRef, { threshold: 1 });

useEffect(() => {
  if (entry?.isIntersecting) {
    fetchMoreData();
  }
}, [entry]);

return <div ref={listEndRef}>Loading more...</div>;
-----------------------------
3️⃣ Animations on Scroll (Fade-In, Slide-In, etc.)
Trigger animations when elements enter the viewport.
const sectionRef = useRef(null);
const entry = useIntersectionObserver(sectionRef, { threshold: 0.3 });

const headerRef = useRef(null);
const entry = useIntersectionObserver(headerRef, { threshold: 0 });

return (
  <header className={entry?.isIntersecting ? 'visible' : 'hidden'} ref={headerRef}>
    Sticky Header
  </header>
);
--

| Use Case         | Description                        |
|-----------------|----------------------------------|
| Lazy Loading    | Load images only when visible   |
| Infinite Scroll | Load more content dynamically   |
| Scroll Animations | Fade-in, slide-in effects on visibility |
| Analytics & Ads | Track impressions for engagement |
| Sticky Headers  | Hide/show headers based on scroll |
| Active Sections | Update active navbar links on scroll |

return (
  <div ref={sectionRef} className={entry?.isIntersecting ? 'fade-in' : 'hidden'}>
    Animated Content
  </div>
);
----------------
5️⃣ Sticky Headers (Show/Hide Based on Scroll Position)
Hide/show a header when scrolling down and bring it back when scrolling up.
const headerRef = useRef(null);
const entry = useIntersectionObserver(headerRef, { threshold: 0 });

return (
  <header className={entry?.isIntersecting ? 'visible' : 'hidden'} ref={headerRef}>
    Sticky Header
  </header>
);
-------------------

Summary of Use Cases
| Use Case         | Description                        |
|-----------------|----------------------------------|
| Lazy Loading    | Load images only when visible   |
| Infinite Scroll | Load more content dynamically   |
| Scroll Animations | Fade-in, slide-in effects on visibility |
| Analytics & Ads | Track impressions for engagement |
| Sticky Headers  | Hide/show headers based on scroll |
| Active Sections | Update active navbar links on scroll |





*/
