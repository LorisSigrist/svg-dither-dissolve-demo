<script lang="ts">
  import blue from "./blue.png";

  let {
    duration,
    id,
    tilesize = 16,
  } = $props<{ duration: number; id: string; tilesize?: number }>();

  const combinations = Array(17)
    .fill(0)
    .map((v, i) => {
      return new Array(16).fill(0).map((v, y) => (y >= i ? 1 : 0));
    });
</script>

<svg
  height="100vh"
  width="100vw"
  class="fixed right-full top-0 opacity-0 -z-50 *:"
>
  <defs>
    <filter {id} x="0" y="0" width="100%" height="100%">
      <feImage
        result="single-bayer"
        href={blue}
        width={470}
        height={470}
        image-rendering="pixelated"
      />
      <feTile
        in="single-bayer"
        result="bayer"
        x="0"
        y="0"
        width="100%"
        height="100%"
      />
      <feColorMatrix
        type="matrix"
        in="bayer"
        result="alpha-bayer"
        values="1 0 0 0 0
            0 0 0 0 1
            0 0 0 0 1
            2 0 0 0 0"
      />

      <feComponentTransfer in="alpha-bayer" result="mask">
        <feFuncA type="identity"></feFuncA>
        <feFuncG type="identity"></feFuncG>
        <feFuncB type="identity"></feFuncB>
        <feFuncA type="table" tableValues={combinations[0].join(" ")}>
          <animate
            attributeName="tableValues"
            values={combinations.map((steps) => steps.join(" ")).join(";")}
            dur="{duration}ms"
            repeatCount="0"
            fill="freeze"
          />
        </feFuncA>
      </feComponentTransfer>

      <feComposite in="SourceGraphic" in2="mask" operator="in" />
    </filter>
  </defs>
</svg>
