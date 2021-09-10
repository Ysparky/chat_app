import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ConversacionDTO } from './conversacion.dto';
import { Conversacion } from './conversacion.entity';

@Injectable()
export class ConversacionService {
  constructor(
    @InjectRepository(Conversacion)
    private readonly conversacionRepository: Repository<Conversacion>,
  ) {}

  async listConversaciones(active: boolean): Promise<Conversacion[]> {
    return await this.conversacionRepository.find({
      where: { flag: true, active },
    });
  }

  async findById(id: number): Promise<Conversacion> {
    return await this.conversacionRepository.findOne({
      where: { id, flag: true },
    });
  }

  async createConversacion(data: ConversacionDTO): Promise<Conversacion> {
    const conversacion = this.DTOToConversacion(data);
    const newConversacion = this.conversacionRepository.create(conversacion);
    const { id } = await this.conversacionRepository.save(newConversacion);

    return this.findById(id);
  }

  async updateConversacion(
    id: number,
    data: ConversacionDTO,
  ): Promise<Conversacion> {
    const conversacion = this.DTOToConversacion(data);
    await this.conversacionRepository.update({ id }, conversacion);

    return this.findById(id);
  }

  async archiveConversacion(id: number): Promise<boolean> {
    const conversacion = await this.conversacionRepository.update(
      { id },
      { active: true },
    );

    return conversacion.affected === 1;
  }

  async deleteConversacion(id: number): Promise<boolean> {
    const conversacion = await this.conversacionRepository.update(
      { id },
      { flag: false },
    );

    return conversacion.affected === 1;
  }

  DTOToConversacion(data: ConversacionDTO): DeepPartial<Conversacion> {
    return {
      nombre: data.nombre,
    };
  }
}
