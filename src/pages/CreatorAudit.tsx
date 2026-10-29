import { products } from "../config/site";
import ProductPage from "../components/ProductPage";

const product = products.find((p) => p.slug === "creator-audit")!;
const others = products.filter((p) => p.slug !== "creator-audit");

export default function CreatorAudit() {
  return <ProductPage product={product} otherProducts={others} />;
}
