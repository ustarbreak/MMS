import { legalContent } from "../config/site";
import LegalPage from "../components/LegalPage";

export default function TermsOfService() {
  return <LegalPage {...legalContent.terms} />;
}
