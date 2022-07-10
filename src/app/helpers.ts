import { environment } from "src/environments/environment";

export const mkTitle = (title: string): string => `${title} | ${environment.APP_NAME}`