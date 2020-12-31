import React, {FC} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RestaurantDetailPage } from "./container/RestaurantDetail";
import { RestaurantListPage } from "./container/RestaurantList";

const Header: FC = () => {
    return(
        <header className="hero is-warning">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        日大文理
                    </h1>
                    <p>
                        ラーメンレビュー
                    </p>
                </div>
            </div>
        </header>
    )
}

const Footer: FC = () => {
    return(
        <footer className="footer">
            <div className="content">
                <p className="has-text-centered">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, laboriosam quia. Amet, aspernatur debitis error facilis fugiat ipsa ipsum laboriosam laborum, optio pariatur placeat quae quas quisquam, sit temporibus vero.</span><span>Dolores excepturi iste nam perferendis porro. Animi asperiores assumenda aut, beatae deleniti doloribus dolorum ea eos excepturi explicabo, iure iusto magnam magni nemo nisi perspiciatis quas recusandae reprehenderit ullam veritatis!</span><span>Aliquam esse laborum repudiandae. Adipisci alias esse id incidunt ipsa quaerat quos rem repellendus tempore ut! Assumenda cumque delectus dolorem eum, impedit iste, magni molestias nemo nostrum perspiciatis qui, ut.</span>
                </p>
            </div>
        </footer>
    )
}


const App: FC = () => {
  return (
      <Router>
          <Header />
          <section className="section has-background-warning-light">
              <div className="container">
                  <div className="block has-text-right">
                      <button className="button is-waring is-inverted is-outlined">
                          ログイン
                      </button>
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
