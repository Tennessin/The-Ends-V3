import { useState } from "react";
import { DetailModal } from "../../components/ui/detail-modal";
import type { CatalogItem } from "../../data/items";
import { AttributeUpgradesSection } from "./sections/AttributeUpgradesSection";
import { FactionSkillGuideSection } from "./sections/FactionSkillGuideSection";
import { IllegalAreaHeroSection } from "./sections/IllegalAreaHeroSection";
import { RandomWheelRewardsSection } from "./sections/RandomWheelRewardsSection";
import { WeaponDrugCatalogSection } from "./sections/WeaponDrugCatalogSection/WeaponDrugCatalogSection";

export const Windy = (): JSX.Element => {
  const [modalItem, setModalItem] = useState<CatalogItem | null>(null);
  const [drugQuantity, setDrugQuantity] = useState<string | undefined>();

  const handleItemSelected = (item: CatalogItem, quantity?: string) => {
    setModalItem(item);
    setDrugQuantity(quantity);
  };

  const handleModalClose = () => {
    setModalItem(null);
    setDrugQuantity(undefined);
  };

  return (
    <main className="w-full bg-[#050607] text-[#f7f5f2]">
      <IllegalAreaHeroSection />
      <div className="mx-auto w-full max-w-[1440px] px-2 sm:px-3">
        <div className="h-[5px] w-full bg-[#161b22]" />
      </div>
      <section
        id="supply-drop"
        className="mx-auto flex w-full max-w-[1440px] scroll-mt-6 flex-col gap-6 px-2 py-4 sm:px-3"
      >
        <RandomWheelRewardsSection onItemSelected={handleItemSelected} />
        <div className="h-[3px] w-full bg-[#161b22]" />
      </section>
      <FactionSkillGuideSection />
      <WeaponDrugCatalogSection onItemClick={setModalItem} />
      <AttributeUpgradesSection />
      <DetailModal item={modalItem} drugQuantity={drugQuantity} onClose={handleModalClose} />
    </main>
  );
};
