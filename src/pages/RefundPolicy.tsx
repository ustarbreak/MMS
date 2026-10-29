import { legalContent } from "../config/site";
import LegalPage from "../components/LegalPage";

export default function RefundPolicy() {
  return <LegalPage {...legalContent.refund} />;
}
