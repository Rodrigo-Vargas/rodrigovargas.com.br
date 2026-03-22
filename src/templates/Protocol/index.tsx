const ProtocolTemplate = () => {
   return (
      <div className="flex flex-row">
         <div className="shadow-md fixed w-32 h-screen">
            <div>
               <span>Protocol</span>
            </div>
            <a href="#meal-preparation">Meal Preparation</a>
         </div>

         <div id="#meal-preparation" className="ml-32 p-5">
            <h2>Meal preparation</h2>

            <div className="mb-5">
               <h3>Breakfast</h3>

               <div>
                  <h4>Air Friyed baked potato slices</h4>

                  <span>Ingredients</span>
                  <div>
                     <ul>
                        <li>200g sweet potato</li>
                        <li>Olive Oil</li>
                     </ul>
                  </div>

                  <span>How to prepare</span>

                  <div>
                     Every Saturday, prepare 7 servings to the week. It takes usually 1-2 hours to prepare everything. Freeze everything on the freezer
                  </div>

                  <span>Benefits</span>
                  <ul>
                     <li>Prevent Mature Aging</li>
                     <li>Maitaning gut health</li>
                     <li>Preventing diabetes</li>
                  </ul>

                  <span>Nutritional Facts</span>
                  <ul>
                     <li>
                        <span>Calories</span>
                        <span>135 kcal</span>
                     </li>
                     <li>
                        <span>Carbohidrates</span>
                        <span></span>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="mb-5">
               <h3>Chicken breasts with Broccoli</h3>

               <div>
                  <span>Ingredients</span>
                  <ul>
                     <li>100g Brocolli</li>
                  </ul>
               </div>

               Broccoli should be made once a week

            </div>
         </div>

         <div id="#supplements" className="ml-32 p-5">
            <h2>Supplements</h2>

            <div className="mb-5">
               <span>With Lunch</span>


               <ul>
                  <li>EPA (840mg)/DHA (521mg)</li>
                  <li>Creatine 1.75g</li>

                  <li>Vitamin A (1000ug)</li>
               </ul>
            </div>

         </div>

         <div id="studies">
            <h3>Broccoli</h3>

            Weekly Target
            1.4kg of Broccoli
            
            Carbs: 92.3 g
            Protein: 40.0 g
            Fat: 4.6 g
            Fiber: 36.9 g
            Vitamin C: 296.7% of RDI
            Vitamin A: 24.2% of RDI
            Vitamin K: 255.0% of RDI
            Vitamin B9 (Folate): 30.8% of RDI
            Potassium: 17.6% of RDI
            Phosphorus: 13.2% of RDI
            Selenium: 6.6% of RDI

            <div>
               https://www.healthline.com/nutrition/benefits-of-broccoli#TOC_TITLE_HDR_12
            </div>
         </div> 
      </div>
   );
};

export default ProtocolTemplate;