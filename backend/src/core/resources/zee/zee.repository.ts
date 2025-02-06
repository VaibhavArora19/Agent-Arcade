import { Injectable } from '@nestjs/common';
import { Zee } from './zee.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateZeeDto } from './dto/create-zee.dto';

@Injectable()
export class ZeeRepository {
  constructor(@InjectModel(Zee.name) private readonly zeeModel: Model<Zee>) {}

  async create(createZeeDto: CreateZeeDto) {
    const newZee = new this.zeeModel(createZeeDto);

    return await newZee.save();
  }

  async findAll() {
    const data = await this.zeeModel.find().lean();

    return data;
  }

  async findByName(name: string) {
    const data = await this.zeeModel.findOne({ zeeName: name }).lean();

    return data;
  }
}
