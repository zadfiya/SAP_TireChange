import { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes as Switch
} from "react-router-dom";
import { customRoutes } from "./BasePageConfig";

const BasePage = () => {
  return (
    <Suspense>
      <Switch>
        {/* <Route exact path="/" element={<Navigate to="/" replace />} /> */}
        {customRoutes.map(
          ({ path, Component, isActive }) =>
            isActive && <Route key={path} path={path} element={<Component />} />
        )}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Switch>
    </Suspense>
  )
}

export default BasePage