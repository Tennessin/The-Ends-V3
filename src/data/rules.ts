/**
 * Rules of Engagement for faction roleplay on The Ends RP.
 * Numbered per section (1.1, 1.2 ...) by position, so inserting a rule
 * re-numbers everything after it automatically.
 */

export interface RuleSection {
  id: string;
  title: string;
  /** Short lead-in shown under the section heading (optional). */
  intro?: string;
  rules: string[];
  /** Free-form text after the rules (optional). */
  outro?: string[];
}

export const RULES_INTRO =
  "Welcome to The Ends RP. This is a serious roleplay server and our faction roleplay expectations are high. Once you engage in our faction roleplay, you are acknowledging and agreeing to the rules of engagement listed below. Please understand that once a rule is broken, you will be punished accordingly.";

export const RULE_SECTIONS: RuleSection[] = [
  {
    id: "faction-attacks",
    title: "Faction Attacks",
    rules: [
      "The maximum number of people you're allowed to bring on an attack is 4 people. (This is excluded if it's on your set turf.)",
      "After committing an attack on a faction's turf, you are not able to spin that faction's turf for 72 hours and cannot spin other faction turfs for 24 hours.",
      "Factions can't attack or rob within the first or last 15 minutes of a server restart.",
      "Without at least three negative interactions (fist fights, robbing, stabbing etc.), excluding arguments, between the factions, you are not allowed to engage in a shootout or a knife fight with a rival faction.",
      "When a player goes into the death script, it is considered an attack.",
      "Attacks must escalate realistically but also organically.",
      "Shooting or stabbing for RP, such as shooting in the air or pulling your knife out on an opposing turf, is not considered an attack. No one in the scene can be injured. You are liable to get shot back at as long as the gun isn't aimed.",
      "If you are attacking a faction and there are 4 or more members on a faction's turf, you may commit a deathmatching attack (no pinpointing). If you are invited to a turf before a server restart, the first and last 15 minute rule is negated.",
      "The maximum that you can intentionally kill on a faction attack is 3 (if they are marked in red). If the number becomes more than three unintentionally, the last user will get revived and there will be no refunds for the attacking faction. If you shoot back you are excluded from this protection.",
      "If a faction attack gets voided you have to wait 30 minutes until you can attack the faction again. During this time, play your block.",
      "Tog names can be a form of pinpointing only when they have no mask on.",
      "If a user has a mask on and is avoiding roleplay in public, they are liable to be attacked.",
    ],
  },
  {
    id: "miscellaneous",
    title: "Miscellaneous Faction Rules",
    rules: [
      "If you are not a member of a faction, you are not able to participate in a faction attack.",
      "No one should be roleplaying items they do not have in their inventory. That is powergaming, unless you are roleplaying pump-faking or bluffing.",
      "After any form of combat, a faction must play their block for at least 30 minutes.",
      "Only Tier 1 and Tier 0.5 factions can STK (shoot to kill).",
      "Tier 1 and Tier 0.5 factions can't STK Tier 0 factions.",
      "No one should be making spitting noises or urinating or defecating on dead bodies. If you are caught doing this it will be a permanent ban from the server.",
      "Civilians must not be robbed or kidnapped without a valid reason. This needs to be backed by proper roleplay. You also cannot kidnap someone if you have no weapons.",
      "Once faction drops are being done, no faction should be using their weapons until there is an announcement stating that faction drops have concluded.",
      "Reloading during an attack is prohibited and will result in punishment.",
      "If the roleplay is sufficient enough and the opposing faction hasn't slid back within 72 hours, you can double attack. You may not attack a faction if it hasn't been 72 hours.",
      "You are not allowed to perform an attack if you are on cooldown, regardless of how heavily they provoked you. This rule applies to double attacking as well.",
      "If your faction is on probation you shall not use any weapons or equip them.",
      "If you are 3 people up or more, you MUST represent your gang.",
      "You may not commit a faction attack out of any supercar or luxury vehicle unless you're a Tier 2 or higher faction.",
      "Solo attacks against groups of faction members are prohibited. If you have individual beef you are allowed to act on it alone as long as the person is by themselves and there is sufficient roleplay.",
      "As a faction member, you are only allowed to roleplay your injuries IF you get shot and don't enter the death script. If you enter the death script while being shot you are to Character Kill. Being caught avoiding a Character Kill will result in a 5 day ban.",
      "As a faction roleplayer, there should be no binded /me's. If you are caught with any binded /me's it can result in a faction strike.",
      "Tier 2 factions or higher may commit an attack every 12 hours.",
      "The cooldown for each robbery is 4 hours.",
      "You can only reload on defence. If seen reloading after shooting elsewhere, it will result in a faction strike.",
      "You cannot roleplay car sounds, for example doors opening or doors closing.",
      "You cannot /scene on any interiors that are not a house or apartment.",
      "You need 2 interactions in order to rob someone UNLESS there is sufficient reasoning (flashing money, drugs, guns etc.).",
      "Robberies are considered an attack if a player is attacked on their set turf. Otherwise, robbery cooldowns need to be followed.",
      "If you are CK'ed, leave a faction or get kicked from a faction, you have to wait 3 days before joining a faction.",
      "One robbery interaction is not a proper reason to put someone into death mode, unless a lethal firearm, knife or drugs (a reasonable amount, 5k+) are included. Otherwise it falls under poor escalation. Please make sure to build roleplay upon the characters before having a valid reason to kill.",
      "Robbing someone on their turf is a faction attack.",
      "You are not allowed to backdoor a faction you do not have any interactions with. You need at least 3 interactions.",
      "All revenge or conflict must have solid, realistic in-character reasoning backed by ongoing RP and development. Quick or one-line excuses (e.g. \"he killed my friend\") without proper investigation or buildup count as Backdoor RP and may lead to admin action.",
      "Threads in the Discord must showcase your faction's roleplay such as events and block activity. You should not be showing stabbings or shootings on your thread; that should all be logged in your faction Discord.",
      "All interactions with other factions must be logged correctly in your faction Discord. If you attack an opposing faction on their turf, log it as an attack in your Discord. Any faction not logging their interactions consistently risks getting disbanded with no warnings.",
      "If you catch a member of a faction on a set faction's turf, whether they are alone or not, and they fit a faction member's description (masked up etc.) and they decide to avoid roleplay with you (playing to win), you have full authority to kill the player (CK).",
      "Failure to fear your life with a gun or knife to your head will result in punishment. If you are caught with a weapon on you and are playing to win, it will result in a faction punishment.",
      "Factions may be punished for playing to win or avoiding roleplay.",
      "Any weapon that is gained through RP needs to be clipped (2 minutes). For example, if it was a gun, the serial code will need to be run through Lead FM to make sure it isn't a malicious weapon.",
    ],
  },
  {
    id: "marks-pinpoints",
    title: "Marks & Pinpoints",
    intro:
      "Marking a player five times allows you to request a CK (Character Kill). This rule also applies during test drops. You may only mark someone for valid reasons, and marks must be made during the active scene.",
    rules: [
      "Valid reasons to mark: they are attacking or attempting to harm you (e.g. tagging or stabbing), they are making serious threats against you, or they are mentioning or disrespecting deceased friends or relatives in a harmful way.",
      "To mark a player, use /tognames to find their ID, then /mark (ID) to issue the mark. The first mark can only happen on the scene.",
      "All marks must be recorded (clipped) and logged in the Ends faction Discord or your personal faction Discord.",
      "Once you have marked a player three separate times and believe you qualify for a CK, create a ticket in Discord with three separate clips in chronological order showing each mark, and clear context for each situation. The FM team will review your submission and greenlight the CK if all requirements are met.",
      "Marking someone 5 times makes you able to pinpoint them for CK. This applies during test drops as well.",
      "Your character may also be CK'ed if you get caught lacking on low HP, or you signed a CK contract to your old faction and they make you enter the death script by stabbing or shooting you.",
    ],
  },
  {
    id: "illegal-civilians",
    title: "Illegal Civilian Interactions",
    rules: [
      "Illegal Civilians are allowed to roleplay being from a \"hood\" of an official faction, but if you want to participate in the beef(s) of a faction you will be removed from the scheme and told to join said faction. You should not be sitting on the block all day and night strictly gangbanging with this faction while roleplaying as an illegal civ. You are an illegal civilian with your own storyline, beefs and interactions.",
      "Illegal civilians cannot intentionally defend with factions with no prior positive interactions with the faction they are defending.",
    ],
  },
  {
    id: "poor-escalation",
    title: "Poor Escalation",
    rules: [
      "Any type of roleplay that wasn't built up properly or given a sufficient reason to perform a faction attack can lead to a punishment.",
    ],
  },
  {
    id: "mutual-combat",
    title: "Mutual Combat & In-Traffic",
    intro:
      "When two large factions (5+ members each) interact in the same area, creating a hostile environment that could lead to a shootout or knife fight, it's considered a potential faction conflict. This includes all areas, even greenzones or spots deemed inappropriate by Faction Management (e.g. meeting at a mall or gas station that turns violent).",
    rules: [
      "The maximum amount of people you're allowed to bring on a brawl is 8 people per faction. This includes allies.",
      "You may not linger in a faction's turf for more than 10 minutes, as it may be considered turf camping.",
      "After a negative interaction involving a weapon, you will have to play your block for an hour. After this hour is up you still cannot go back in traffic: there is an additional 2 hours where you can't have the intention to go in traffic intending to harm another individual or faction.",
      "Having a gun or a knife out and using emotes such as (e pockets) or any form of hiding your weapon will result in punishment, as it is seen as playing to win.",
      "Members of a faction who are not participating in the faction attack are not permitted to scout or spin enemy turf.",
      "At public gatherings like parties or get-togethers that were advertised via Word Around Town in the Discord, factions are not permitted to shoot, beef or cause drama. A different place needs to be chosen for the drama or back and forth. At non-promoted events (not on Word Around Town, Discord etc.) you may commit a faction attack.",
      "Selling weapons to civilians is not allowed. Doing this will lead to serious consequences.",
      "If you get shot and you are above 50% health you have to RP injuries for 24 hours. If below 50% you will have to RP injuries for 48 hours. Your character cannot do normal gang activities for this time period, such as sliding or holding weapons.",
      "If you get stabbed and you are above 50% health you have to RP injuries for 12 hours. If below 50% you will have to RP injuries for 24 hours. Your character cannot do normal gang activities for this time period, such as sliding or holding weapons.",
      "If you get stabbed and enter the death script, you are out for 24 hours. This means no ride outs and no attempting to stab anyone else during that time. Knife fights can continue until someone hits the ground. Whoever is still standing does not have to sit out until the next restart.",
      "With sufficient proof, factions may be terminated for using crosshairs.",
      "It is strictly banned to use Discords, streams, clips or engage in general metagaming while playing. Getting caught could result in a faction strike or, depending on the severity, faction termination.",
      "You must stay in the server 30 minutes after initiating the attack. The same applies for defence.",
      "If a faction hasn't applied to become a faction, no gangs or factions can be formed. A faction may start its development and engage in faction activity once it has a thread.",
      "Anything that's not a good representation of faction roleplay, as deemed by IFM, could lead to a punishment.",
      "Members of a faction are not permitted to enter local OOC or act out of character without justification. Faction Management will punish you or your faction if you enter local OOC because you are unable to take an L. You can also report any members of a faction that engage in this behaviour. Ask questions later after letting the situation develop.",
      "Before even considering participating in a shootout, you must fully develop each character. You must wait AT LEAST 72 hours (3 days) after a character is made and/or joins a faction before committing a faction attack. Failure to do so can be a punishment.",
      "You may not attempt to take someone's inventory items after knocking them out, only things like shoes, clothes etc. Everything must be roleplayed with /me's and /do's if doing so.",
      "If your faction is found to have hackers, cheaters or people using hitbox, consequences will be given.",
      "Public bashing and/or OOC toxicity towards a set faction's roleplay could result in a punishment. Either make a report or leave it as is, and have common courtesy towards the faction.",
      "Depending on the severity, a faction will receive a strike or face closure if there are multiple occasions where members are repeatedly provoking within a greenzone or on opposing faction turfs.",
    ],
  },
  {
    id: "engagement-guidelines",
    title: "Engagement, Shootout & Stabbing Guidelines",
    rules: [
      "No speed boosting, no tracers and no \"100k or die\" shooting when in the server. Example of what not to do: https://streamable.com/xhxd6y",
      "What you can do regarding shooting, example: https://streamable.com/7egy0v",
      "The killer's POV (with sound) of at least 2 minutes MUST be provided if asked for. Any failure to do so could result in a lost report, which could end up in your faction getting punished. The clip must be from GeForce or AMD recording software. Twitch and Kick clips are valid, and it must show the desktop and taskbar if in windowed mode.",
    ],
  },
  {
    id: "water-evading",
    title: "Water Evading",
    rules: [
      "Factions may not use water as an attempt to escape from police or a set faction. This also applies to using water after a shootout in an attempt to remove GSR.",
    ],
  },
  {
    id: "faction-reports",
    title: "Faction Reports",
    rules: [
      "If you want to report a faction, a report must be made within 24 hours of the incident. Reporting for revenge because a situation didn't go as planned is forbidden and you will be punished.",
      "All clips reporting an opposing faction must be recorded with NVIDIA or AMD software. If you are struggling to set this up, open a ticket and ask for support. Not using it will make your scene invalid. The clips must be 2 minutes with audio of both parties to be valid. Any ticket without a valid 2 minute clip will be closed.",
      "If you have an open report on another faction, you should not participate in any type of negative interaction with that faction until the verdict has been decided and posted (and vice versa).",
      "Factions may be prohibited from selling guns or drugs as long as there is an active faction report up.",
      "PLEASE AVOID CONTACTING FACTION MANAGEMENT IN THEIR PRIVATE MESSAGES. ANYONE CAUGHT DOING THIS REPEATEDLY WILL GET BANNED.",
    ],
  },
  {
    id: "weapon-logging",
    title: "Weapon Logging & Refill Policy",
    rules: [
      "Logged faction drop guns and knives that are lost will be eligible to be respun in 3 days. Test factions are not eligible for this.",
      "Any firearm or knife that was not registered with Faction Management can result in a ban and/or strike if caught more than once. No excuses. Guns that are robbed or purchased must be logged.",
    ],
  },
];

export const TOTAL_RULES = RULE_SECTIONS.reduce((n, s) => n + s.rules.length, 0);
