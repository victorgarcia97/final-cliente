import { Deporte } from "./deporte";

export interface TipoEvento {
    id?: number;
    deporteId: number;
    deporte?: Deporte;
    competicion: string;
    fechaInicio: Date;
    fechaFin: Date;
    descripcion?: string;
}
