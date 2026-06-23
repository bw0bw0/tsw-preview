import type { MemberPatch } from "./patcher";

export const PATCHES: Record<string, MemberPatch | MemberPatch[]> = {
    "Entity.GetComponent": {
        parameterTypes: ["Type"],
        rawSignature:
            "GetComponent<T extends Component>(componentType: abstract new (...args: any[]) => T): T | undefined",
    },
};
