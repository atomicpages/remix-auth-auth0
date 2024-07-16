import { installGlobals } from "@remix-run/node";
import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);

installGlobals();
fetchMocker.enableMocks();
