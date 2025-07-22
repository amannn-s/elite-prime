import React from "react";
import CreatePropertyForm from "./create-property-form";

const CreatePropertyPage = () => {
  return (
    <main>
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-4xl font-bold mb-4">Add your Property to Sell</h2>

          <CreatePropertyForm />
        </div>
      </section>
    </main>
  );
};

export default CreatePropertyPage;
