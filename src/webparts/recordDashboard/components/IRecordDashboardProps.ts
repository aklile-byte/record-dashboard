import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IRecordDashboardProps {
  description: string;
  context: WebPartContext,
  webURL: string;
}
