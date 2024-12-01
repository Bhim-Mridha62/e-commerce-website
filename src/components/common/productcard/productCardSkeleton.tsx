import { Skeleton } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles

const ProductCardSkeleton = () => {
  return (
    <div className="w-[140px] md:w-[200px] h-[250px] md:h-[300px]">
      {/* Product Image Skeleton */}
      <div className="w-full bg-theme-grey rounded-lg aspect-[4/4] mb-2">
        <Skeleton.Image
          active
          rootClassName="h-full !w-full"
          className="rounded-lg"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <Skeleton.Input
        active
        size="small"
        rootClassName="h-3 !w-full mt-2"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <Skeleton.Input
        active
        size="small"
        rootClassName="h-3 !w-full mt-2"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <Skeleton.Input
        active
        size="small"
        rootClassName="h-3 !w-full mt-2"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default ProductCardSkeleton;
