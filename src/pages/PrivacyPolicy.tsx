import { legalContent } from "../config/site";
import LegalPage from "../components/LegalPage";

export default function PrivacyPolicy() {
  return <LegalPage {...legalContent.privacy} />;
}
