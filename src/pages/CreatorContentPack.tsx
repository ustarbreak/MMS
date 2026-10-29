import { products } from "../config/site";
import ProductPage from "../components/ProductPage";

const product = products.find((p) => p.slug === "creator-content-pack")!;
const others = products.filter((p) => p.slug !== "creator-content-pack");

export default function CreatorContentPack() {
  return <ProductPage product={product} otherProducts={others} />;
}
