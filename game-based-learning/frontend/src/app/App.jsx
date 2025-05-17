import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactUs, AboutUs, MyCollection, LogInPage } from "../views";
import GameDetails from "../views/DetailsPage";
import PS5Promotion from "../views/MoreInfoPage";
import CollectionPage from "../views/CollectionPage";
import LTTrainer from "../views/LTTrainer";

import "bootstrap/dist/css/bootstrap.min.css";
import Monthly from "../views/MonthlyGames";
import { useState } from "react";
import { Navigation } from "../components";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Navigation isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/login"
            element={<LogInPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/" element={<CollectionPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/lttrainer"
            element={
              <LTTrainer
                companyName="GBL"
                userName="Admin Panel"
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/collection" element={<MyCollection />} />
          <Route path="/gameDetails/:id" element={<GameDetails />} />
          <Route path="/moreInfo" element={<PS5Promotion />} />
          <Route path="/monthly" element={<Monthly />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
