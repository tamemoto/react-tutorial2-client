import React, {FC} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RestaurantDetailPage } from "./container/organisms/RestaurantDetail";
import { RestaurantListPage } from "./container/organisms/RestaurantList";
import Header from "./components/molecules/AppHeader";
import Footer from "./components/molecules/AppFooter";
import EnhancedAuthButton from "./container/atoms/AuthButton";

const App: FC = () => {
  return (
      <Router>
          <Header />
          <section className="section has-background-warning-light">
              <div className="container">
                  <div className="block has-text-right">
                      <EnhancedAuthButton />
                  </div>
                  <Switch>
                      <Route path="/" exact>
                          hoge
                      </Route>
                      <Route path="/restaurants" exact>
                          <RestaurantListPage />
                      </Route>
                      <Route path="/restaurants/:restaurantId">
                          <RestaurantDetailPage />
                      </Route>
                  </Switch>
              </div>
          </section>
          <Footer />
      </Router>
  );
}

export default App;
