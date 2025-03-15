export const elementColors = [
    "rgb(244,129,132)", //group1
    "rgb(247,158,85)",  //group2
    "rgb(106,161,191)", //group3
    "rgb(129,209,214)", //group4
    "rgb(74,174,80)",   //group5
    "rgb(128,128,128)", //group6
    "rgb(205,165,69)",  //group7
    "rgb(129,210,101)", //group8
    "rgb(74,187,185)",  //group9
    "rgb(76,118,184)",  //group10
    "rgb(185,144,188)", //group11
]as const;

export type ColorType = typeof elementColors[number];