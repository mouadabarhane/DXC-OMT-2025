import CatalogRequestVolume from './CatalogRequestVolume/CatalogRequestVolume';
import CategoryDistribution from './CategoryDistribution/CategoryDistribution';
import FulfillmentStatusByProduct from './FulfillmentStatusByProduct/FulfillmentStatusByProduct';
import ProductAvailabilityStatus from './ProductAvailabilityStatus/ProductAvailabilityStatus';
import ProductCategoriesPopularity from './ProductCategoriesPopularity/ProductCategoriesPopularity';
import ServiceAgentActivity from './ServiceAgentActivity/ServiceAgentActivity';
import VirtualAgentButton from '../../../../components/VirtualAgent/VirtualAgentButton';

export default function Dashboard() {
  return (
    <div className="p-8 bg-gradient-to-br from-[#F1F5F9] to-[#FFFFFF] rounded-[40px] shadow-2xl space-y-12">

      <h1 className="text-5xl font-extrabold text-[#0098C2] mb-8 text-center">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-8 bg-gradient-to-r from-[#0098C2] to-[#8DC9DD] text-white p-6 rounded-2xl shadow-xl border border-[#0098C2] hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-300">
          <h2 className="text-2xl font-bold mb-6">Catalog Request Volume</h2>
          <CatalogRequestVolume />
        </section>

        <section className="col-span-4 text-white p-6 rounded-2xl shadow-xl border border-[#8DC9DD] hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-300">
          <h2 className="text-2xl font-bold mb-6">Category Distribution</h2>
          <CategoryDistribution />
        </section>

        <section className="col-span-12 bg-white p-6 rounded-2xl shadow-xl border border-[#0098C2] hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-300">
          <h2 className="text-2xl font-bold text-[#0098C2] mb-6">Product Categories Popularity</h2>
          <ProductCategoriesPopularity />
        </section>

        <section className="col-span-12 bg-gradient-to-r from-[#0098C2] to-[#8DC9DD] text-white p-6 rounded-2xl shadow-xl border border-[#0098C2] hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-300">
          <h2 className="text-2xl font-bold mb-6">Product Availability Status</h2>
          <ProductAvailabilityStatus />
        </section>

        <section className="col-span-12 text-white p-6 rounded-2xl shadow-xl border border-[#8DC9DD] hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-300">
          <h2 className="text-2xl font-bold text-[#0098C2] mb-6">Fulfillment Status by Product</h2>
          <FulfillmentStatusByProduct />
        </section>

        <section className="col-span-12 bg-white p-6 rounded-2xl shadow-xl border border-[#0098C2] hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-300">
          <h2 className="text-2xl font-bold text-[#0098C2] mb-6">Service Agent Activity</h2>
          <ServiceAgentActivity />
        </section>
      </div>
      <VirtualAgentButton /> {/* Virtual Agent Button */}
    </div>
  );
}
