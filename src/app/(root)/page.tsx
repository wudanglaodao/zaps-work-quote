import { permanentRedirect } from "next/navigation";

export default function RootEntryPage() {
  permanentRedirect("/en");
}
