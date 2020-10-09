import { Deporte } from "./deporte";

export interface TipoApuesta {
    id?: number;
    descripcion?: string;
    multiplicador?: number;
    riesgo?: string;
    deporteId?: number;
    deporte?: Deporte;
    notasExtra?: string;
}
