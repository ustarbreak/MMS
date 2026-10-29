import { products } from "../config/site";
import ProductPage from "../components/ProductPage";

const product = products.find((p) => p.slug === "monthly-growth-partner")!;
const others = products.filter((p) => p.slug !== "monthly-growth-partner");

export default function MonthlyGrowthPartner() {
  return <ProductPage product={product} otherProducts={others} />;
}
