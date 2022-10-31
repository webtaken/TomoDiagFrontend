import LayoutPage from "../components/layout/LayoutPage";
import AppOptions from "../components/Options/AppOptions";


export default function Home() {
  return (
    <>
      <LayoutPage>
        <div className="site-layout-content">
          <AppOptions />
        </div>
      </LayoutPage>
    </>
  )
}
