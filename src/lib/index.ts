import { mount, unmount } from "svelte";
import DitherFilter from "./DitherFilter.svelte";

// place files you want to import through the `$lib` alias in this folder.
export function dissolve(
  node: HTMLElement,
  { duration = 300, tilesize }: { duration?: number, tilesize?: number } = { duration: 300 }
) {
  const id = `dithering-${crypto.randomUUID()}`;
  const target = document.createElement("div");
  document.body.appendChild(target);

  const filter = mount(DitherFilter, {
    target,
    props: {
      id,
      duration,
      tilesize
    },
  });

  node.style.filter = `url(#${id})`;
  return {
    duration,
    tick(t: number) {
      if (t == 0) {
        unmount(filter);
        target.remove();
        node.style.opacity = "0"
      }
    },
  };
}