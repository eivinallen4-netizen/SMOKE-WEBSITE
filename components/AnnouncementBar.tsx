import { site } from "@/data/site";

export default function AnnouncementBar() {
  return (
    <>
      <div className="warning-bar">{site.warning}</div>
      <div className="announce-bar">{site.announcement}</div>
    </>
  );
}
