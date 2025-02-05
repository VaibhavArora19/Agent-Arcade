import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { CreateWalletRepository } from './create-wallet.repository';

@Injectable()
export class CreateWalletService {
  constructor(
    private readonly createWalletRepository: CreateWalletRepository,
  ) {}

  async createWallet(userAddress: string) {
    const address = ethers.getAddress(userAddress);

    const wallet = ethers.Wallet.createRandom();

    await this.createWalletRepository.create({
      userAddress: address,
      walletAddress: wallet.address,
      walletPrivateKey: wallet.privateKey,
    });
  }
}
