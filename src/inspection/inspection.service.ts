import { Injectable } from '@nestjs/common';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InspectionService {

  constructor(private prisma: PrismaService) { }


  async create(createInspectionDto: CreateInspectionDto) {
    return await this.prisma.inspection.create({
      data: {
        name: createInspectionDto.name,
        status: createInspectionDto.status,
        inspectorId: createInspectionDto.inspectorId,
        usuarioId: createInspectionDto.userId,
        locationId: createInspectionDto.locationId
      },
      include: {
        inspector: true,
        usuario: {
          select: {
            persona: {
              select: {
                name: true
              }
            }
          }
        },
        location: true
      }
    });
  }

  async findAll() {
    return await this.prisma.inspection.findMany({
      // include: {
      //   inspector: true,
      //   location: true,
      //   usuario: true
      // },
      select: {
        id: true,
        name: true,
        status: true,
        location: {
          select: {
            id: true,
            name: true
          }
        },
        usuario: {
          select: {
            persona: {
              select: {
                name: true
              }
            }
          }
        },
        inspector: {
          select: {

            persona: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });;
  }

  findOne(id: number) {
    return `This action returns a #${id} inspection`;
  }

  async update(id: number, updateInspectionDto: UpdateInspectionDto) {
    return this.prisma.inspection.update({
      where: {
        id: id
      },
      data: updateInspectionDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} inspection`;
  }
}
