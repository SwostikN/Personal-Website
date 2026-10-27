import type { Project } from "@/lib/types";
import { documed } from "./documed";
import { nagrik } from "./nagrik";
import { clientWebsites, greToolkit } from "./others";
import { rotaract } from "./rotaract";
import { sarbo360 } from "./sarbo360";
import { vestiq } from "./vestiq";

export const projects: Project[] = [sarbo360, rotaract, documed, vestiq, nagrik, clientWebsites, greToolkit].sort(
  (a, b) => a.order - b.order,
);
