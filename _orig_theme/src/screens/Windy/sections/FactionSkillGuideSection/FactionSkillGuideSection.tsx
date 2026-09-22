import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea } from "../../../../components/ui/scroll-area";

type PathTab = "Faction skills" | "Civilian skills" | "Illegal civilian";

const pathTabs: PathTab[] = ["Faction skills", "Civilian skills", "Illegal civilian"];

const skillData: Record<
  PathTab,
  {
    treeTitle: string;
    treeCount: string;
    skills: {
      unlock: string;
      title: string;
      description: string;
      tags: string[];
    }[];
    otherSections: {
      eyebrow: string;
      title: string;
      description: string;
      items: { title: string; description: string }[];
    }[];
  }
> = {
  "Faction skills": {
    treeTitle: "Faction skill tree",
    treeCount: "15 skills listed",
    skills: [
      {
        unlock: "3",
        title: "Nametags",
        description: "Enables viewing nametags above players. Must be in a faction for /mark.",
        tags: ["Faction", "Vision utility"],
      },
      {
        unlock: "5",
        title: "Improvement",
        description: "Allows Faction Members to add an additional slot to their vehicles.",
        tags: ["Faction", "Vehicle upgrade"],
      },
      {
        unlock: "7",
        title: "Tazer Resistance",
        description: "No effect by tasers once per 30 seconds.",
        tags: ["Faction", "Combat defense"],
      },
      {
        unlock: "7",
        title: "Take Cover",
        description: "Allows the user to have access to Q Peak.",
        tags: ["Faction", "Peek access"],
      },
      {
        unlock: "8",
        title: "Masked Identity",
        description: "When a user has a mask on, it toggles their tognames from the character name to 'MASKED'.",
        tags: ["Faction", "Identity concealment"],
      },
      {
        unlock: "10",
        title: "Swift Hands",
        description: "Gives access to Stomach Pull animation.",
        tags: ["Faction", "Animation access"],
      },
      {
        unlock: "10",
        title: "Spot 'Em Got 'Em",
        description: "Increases the radius of tognames for marked players.",
        tags: ["Faction", "Mark radius"],
      },
      {
        unlock: "12",
        title: "Adrenaline Rush",
        description: "When you drop below 40 HP when being hit by a weapon, you'll get a run speed boost.",
        tags: ["Faction", "Movement boost"],
      },
      {
        unlock: "12",
        title: "Top Hustler",
        description: "Increases your money limit by $200,000.",
        tags: ["Faction", "Money cap"],
      },
      {
        unlock: "12",
        title: "Fortitude",
        description: "Allows the user to not have the limping animation while getting shot.",
        tags: ["Faction", "Combat defense"],
      },
      {
        unlock: "13",
        title: "Hot Driver",
        description: "Allows Users to Improve The Cars Vehicle Meta during a Chase.",
        tags: ["Faction", "Chase skill"],
      },
      {
        unlock: "15",
        title: "Rapid Deployment",
        description: "Allows the user to maneuver in out and out vehicles slightly faster.",
        tags: ["Faction", "Entry speed"],
      },
      {
        unlock: "18",
        title: "First Person Shooter",
        description: "Allows No Screenshake or recoil in first person.",
        tags: ["Faction", "Aim control"],
      },
      {
        unlock: "20",
        title: "Headshot Kings",
        description: "Deal additional 3 damage to the head with a firearm.",
        tags: ["Faction", "Firearm bonus"],
      },
      {
        unlock: "20",
        title: "Sharpshooter",
        description: "Takes out 2 of the worst screenshakes while aiming a firearm.",
        tags: ["Faction", "Aim control"],
      },
    ],
    otherSections: [],
  },
  "Civilian skills": {
    treeTitle: "Civilian skill tree",
    treeCount: "14 skills listed",
    skills: [
      {
        unlock: "3",
        title: "Nametags",
        description: "Enables viewing nametags above players. Must be in a faction for /mark.",
        tags: ["Civilian", "Vision utility"],
      },
      {
        unlock: "5",
        title: "Healthy Diet",
        description: "Decreases hunger & thirst decay rate.",
        tags: ["Civilian", "Survival"],
      },
      {
        unlock: "7",
        title: "Don't got time",
        description: "Allows valet to bring your vehicle to you, instead of driving to the garage.",
        tags: ["Civilian", "Vehicle utility"],
      },
      {
        unlock: "7",
        title: "Take Cover",
        description: "Allows the user to have access to Q Peak.",
        tags: ["Civilian", "Peek access"],
      },
      {
        unlock: "8",
        title: "Fuel Saver",
        description: "50% Reduced Fuel Consumption.",
        tags: ["Civilian", "Vehicle economy"],
      },
      {
        unlock: "10",
        title: "Calm Breathing",
        description: "Restores stamina faster.",
        tags: ["Civilian", "Stamina"],
      },
      {
        unlock: "10",
        title: "Location Saver",
        description: "Allows you to select a POI of a specific area on the map that aren't blips, that allows you to save and remove a location at any given point.",
        tags: ["Civilian", "Map utility"],
      },
      {
        unlock: "10",
        title: "Reduced Fall Damage",
        description: "Civilian cannot slip or fall over from jumping too often.",
        tags: ["Civilian", "Safety"],
      },
      {
        unlock: "12",
        title: "Top Hustler",
        description: "Increases your money limit by $200,000.",
        tags: ["Civilian", "Money cap"],
      },
      {
        unlock: "13",
        title: "Hot Driver",
        description: "Allows users to improve the cars performance during a chase.",
        tags: ["Civilian", "Chase skill"],
      },
      {
        unlock: "14",
        title: "Parking Specialist",
        description: "Allows users to have access to /buy and vpark and make their vehicle be accessed from anywhere.",
        tags: ["Civilian", "Vehicle access"],
      },
      {
        unlock: "15",
        title: "XP Boost",
        description: "Increases your XP limit per tsunami.",
        tags: ["Civilian", "XP"],
      },
      {
        unlock: "17",
        title: "Killswitch",
        description: "Allows the vehicle you own that's currently out to be cut off instantly with a command (/killswitch). (/killswitch2 allows car to be operated again).",
        tags: ["Civilian", "Vehicle control"],
      },
      {
        unlock: "30",
        title: "Reputation",
        description: "Verified on Birdy with the current account accessed.",
        tags: ["Civilian", "Verification"],
      },
    ],
    otherSections: [],
  },
  "Illegal civilian": {
    treeTitle: "Illegal civilian skill tree",
    treeCount: "17 skills listed",
    skills: [
      {
        unlock: "3",
        title: "Nametags",
        description: "Enables viewing nametags above players. Must be in a faction for /mark.",
        tags: ["Illegal", "Vision utility"],
      },
      {
        unlock: "7",
        title: "Take Cover",
        description: "Allows the user to have access to Q Peak.",
        tags: ["Illegal", "Peek access"],
      },
      {
        unlock: "8",
        title: "Masked Identity",
        description: "When a user has a mask on, it toggles their tognames from the character name to 'MASKED'.",
        tags: ["Illegal", "Identity concealment"],
      },
      {
        unlock: "10",
        title: "Spot 'Em Got 'Em",
        description: "Increases the radius of tognames for marked players.",
        tags: ["Illegal", "Mark radius"],
      },
      {
        unlock: "10",
        title: "Reduced Fall Damage",
        description: "Civilian cannot slip or fall over from jumping too often.",
        tags: ["Illegal", "Safety"],
      },
      {
        unlock: "10",
        title: "Location Saver",
        description: "Allows you to select a POI of a specific area on the map that aren't blips, that allows you to save and remove a location at any given point.",
        tags: ["Illegal", "Map utility"],
      },
      {
        unlock: "10",
        title: "Calm Breathing",
        description: "Restores stamina faster.",
        tags: ["Illegal", "Stamina"],
      },
      {
        unlock: "12",
        title: "Street Dealer",
        description: "Allows drugs to be sold to NPC's for Dirty Money.",
        tags: ["Illegal", "Drug sales"],
      },
      {
        unlock: "12",
        title: "Adrenaline Rush",
        description: "When you drop below 40 HP when being hit by a weapon, you'll get a run speed boost.",
        tags: ["Illegal", "Movement boost"],
      },
      {
        unlock: "12",
        title: "Top Hustler",
        description: "Increases your money limit by $200,000.",
        tags: ["Illegal", "Money cap"],
      },
      {
        unlock: "12",
        title: "Fortitude",
        description: "Allows the user to not have the limping animation while getting shot.",
        tags: ["Illegal", "Combat defense"],
      },
      {
        unlock: "13",
        title: "Hot Driver",
        description: "Allows users to improve the cars performance during a chase.",
        tags: ["Illegal", "Chase skill"],
      },
      {
        unlock: "15",
        title: "Rapid Deployment",
        description: "Allows the user to maneuver in out and out vehicles slightly faster.",
        tags: ["Illegal", "Entry speed"],
      },
      {
        unlock: "17",
        title: "Killswitch",
        description: "Allows the vehicle you own that's currently out to be cut off instantly with a command (/killswitch). (/killswitch2 allows car to be operated again).",
        tags: ["Illegal", "Vehicle control"],
      },
      {
        unlock: "18",
        title: "First Person Shooter",
        description: "Allows No Screenshake or recoil in first person.",
        tags: ["Illegal", "Aim control"],
      },
      {
        unlock: "20",
        title: "Headshot Kings",
        description: "Deal additional 3 damage to the head with a firearm.",
        tags: ["Illegal", "Firearm bonus"],
      },
      {
        unlock: "20",
        title: "Sharpshooter",
        description: "Takes out 2 of the worst screenshakes while aiming a firearm.",
        tags: ["Illegal", "Aim control"],
      },
    ],
    otherSections: [],
  },
};

export const FactionSkillGuideSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<PathTab>("Faction skills");
  const [animKey, setAnimKey] = useState(0);

  const handleTabChange = (tab: PathTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setAnimKey((k) => k + 1);
  };

  const data = skillData[activeTab];

  return (
    <section id="skill-information" className="relative w-full scroll-mt-6 rounded-lg px-4 py-7 sm:px-7">
      <style>{`
        @keyframes skillFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .skill-anim { animation: skillFadeIn 0.28s ease forwards; }
      `}</style>
      <div className="flex w-full flex-col gap-[22px]">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[760px] flex-col items-start gap-2.5">
            <p className="mt-[-1.00px] [font-family:'Inter',Helvetica] text-xs font-bold leading-[normal] tracking-[0.96px] text-[#b8c7d9]">
              New roleplayer helper
            </p>
            <h2 className="mt-[-1.00px] [font-family:'Inter',Helvetica] text-[36px] font-black leading-[41.6px] tracking-[-1.60px] text-[#f5f7fa] sm:text-[40px]">
              Skill information
            </h2>
            <p className="pt-0.5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[25.5px] tracking-[0] text-[#9aa6b2]">
              A clear guide for players to check what each route can unlock.
              Faction is filled with your real skill list, while Civilian and
              Illegal Civilian are shown as starter placeholder tracks for
              future expansion.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-xl border border-solid border-[#161b22] bg-[#080b10b8] px-3.5 py-2 backdrop-blur-[5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(5px)_brightness(100%)] lg:self-auto">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.6667 7.58331C11.6667 10.5 9.62504 11.9583 7.19837 12.8041C7.0713 12.8472 6.93327 12.8451 6.80754 12.7983C4.37504 11.9583 2.33337 10.5 2.33337 7.58331V3.49998C2.33337 3.17803 2.59476 2.91664 2.91671 2.91664C4.08337 2.91664 5.54171 2.21664 6.55671 1.32998C6.81202 1.11185 7.18806 1.11185 7.44337 1.32998C8.46421 2.22248 9.91671 2.91664 11.0834 2.91664C11.4055 2.91664 11.6667 3.17781 11.6667 3.49998V7.58331" stroke="#F5F7FA" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.25 6.99998L6.41667 8.16665L8.75 5.83331" stroke="#F5F7FA" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            <span className="[font-family:'Inter',Helvetica] text-xs font-bold leading-[normal] tracking-[0.48px] text-[#f5f7fa]">
              3 character paths
            </span>
          </div>
        </header>
        <nav
          aria-label="Skill path tabs"
          className="inline-flex w-fit flex-wrap items-start gap-1.5 rounded-xl border border-solid border-[#161b22] bg-[#0a0d12] px-1 pb-1 pt-1.5"
        >
          {pathTabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <Button
                key={tab}
                type="button"
                variant="ghost"
                onClick={() => handleTabChange(tab)}
                className={`h-auto rounded-xl px-4 py-2.5 transition-all duration-200 hover:bg-transparent ${
                  active
                    ? "bg-[#b8c7d9] text-[#07090c] hover:bg-[#b8c7d9]"
                    : "text-[#9aa6b2] hover:text-[#f5f7fa]"
                }`}
              >
                <span className="[font-family:'Inter',Helvetica] text-[13px] font-bold leading-[normal] tracking-[0]">
                  {tab}
                </span>
              </Button>
            );
          })}
        </nav>
        <div key={animKey} className="skill-anim grid h-fit grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <Card className="h-[720px] rounded-lg border border-solid border-[#161b22] bg-[#050607] shadow-none">
            <CardContent className="flex h-full flex-col gap-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="[font-family:'Inter',Helvetica] text-[22px] font-normal leading-[normal] tracking-[-0.66px] text-[#f5f7fa]">
                  {data.treeTitle}
                </h3>
                <Badge className="rounded-xl border border-solid border-[#161b22] bg-[#0a0d12] px-3 py-2 [font-family:'Inter',Helvetica] text-xs font-bold leading-[normal] tracking-[0] text-[#9aa6b2] hover:bg-[#0a0d12]">
                  {data.treeCount}
                </Badge>
              </div>
              <ScrollArea className="h-[618px] pr-2">
                <div className="grid grid-cols-1 gap-3 pb-1">
                  {data.skills.map((skill) => (
                    <article
                      key={`${skill.title}-${skill.unlock}`}
                      className="grid grid-cols-[112px_minmax(0,1fr)] gap-3.5 rounded-md border border-solid border-[#161b22] bg-[#0a0d12] p-4"
                    >
                      <div className="flex flex-col justify-center gap-1">
                        <span className="[font-family:'Inter',Helvetica] text-[11px] font-bold leading-[normal] tracking-[0.88px] text-[#9aa6b2]">
                          UNLOCK
                        </span>
                        <span className="[font-family:'Inter',Helvetica] text-[28px] font-black leading-[normal] tracking-[-1.12px] text-[#f5f7fa]">
                          {skill.unlock}
                        </span>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <h4 className="[font-family:'Inter',Helvetica] text-lg font-normal leading-[normal] tracking-[-0.36px] text-[#f5f7fa]">
                          {skill.title}
                        </h4>
                        <p className="[font-family:'Inter',Helvetica] text-sm font-normal leading-[23.1px] tracking-[0] text-[#9aa6b2]">
                          {skill.description}
                        </p>
                        <div className="flex flex-wrap items-start gap-2 pt-1">
                          {skill.tags.map((tag) => (
                            <Badge
                              key={`${skill.title}-${tag}`}
                              className="rounded-xl border border-solid border-[#161b22] bg-[#080b10] px-2.5 py-[7px] [font-family:'Inter',Helvetica] text-xs font-bold leading-[normal] tracking-[0] text-[#f5f7fa] hover:bg-[#080b10]"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="h-[720px] rounded-lg border border-solid border-[#161b22] bg-[#050607] shadow-none">
            <CardContent className="flex h-full flex-col gap-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="[font-family:'Inter',Helvetica] text-[22px] font-normal leading-[normal] tracking-[-0.66px] text-[#f5f7fa]">
                  Other path tabs
                </h3>
                <Badge className="rounded-xl border border-solid border-[#161b22] bg-[#0a0d12] px-3 py-2 [font-family:'Inter',Helvetica] text-xs font-bold leading-[normal] tracking-[0] text-[#9aa6b2] hover:bg-[#0a0d12]">
                  Placeholder sets
                </Badge>
              </div>
              <ScrollArea className="h-[618px]">
                <div className="flex flex-col gap-4 pr-[9px]">
                  {data.otherSections.map((section) => (
                    <section
                      key={section.title}
                      className="flex flex-col items-start rounded-md border border-solid border-[#161b22] bg-[#0a0d12] p-4"
                    >
                      <p className="[font-family:'Inter',Helvetica] text-xs font-bold leading-[normal] tracking-[0.96px] text-[#b8c7d9]">
                        {section.eyebrow}
                      </p>
                      <h4 className="pt-2 [font-family:'Inter',Helvetica] text-xl font-normal leading-[normal] tracking-[-0.60px] text-[#f5f7fa]">
                        {section.title}
                      </h4>
                      <p className="pt-2 [font-family:'Inter',Helvetica] text-sm font-normal leading-[23.1px] tracking-[0] text-[#9aa6b2]">
                        {section.description}
                      </p>
                      <div className="mt-2.5 flex w-full flex-col gap-2.5">
                        {section.items.map((item) => (
                          <article
                            key={item.title}
                            className="flex flex-col gap-[5.4px] rounded-md border border-solid border-[#161b22] bg-[#080b10] px-3.5 py-3"
                          >
                            <h5 className="[font-family:'Inter',Helvetica] text-sm font-bold leading-[normal] tracking-[0] text-[#f5f7fa]">
                              {item.title}
                            </h5>
                            <p className="[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[20.8px] tracking-[0] text-[#9aa6b2]">
                              {item.description}
                            </p>
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                  <section className="flex flex-col items-start gap-2 rounded-md border border-solid border-[#161b22] bg-[#0a0d12] p-4">
                    <p className="[font-family:'Inter',Helvetica] text-xs font-bold leading-[normal] tracking-[0.96px] text-[#b8c7d9]">
                      Guide note
                    </p>
                    <p className="[font-family:'Inter',Helvetica] text-sm font-normal leading-[23.1px] tracking-[0] text-[#9aa6b2]">
                      This section is built as a viewer, not a builder. Players
                      can read what skills each character route can have before
                      choosing how they want to play.
                    </p>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
