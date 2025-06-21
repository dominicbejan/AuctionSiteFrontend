import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-update-auction',
  templateUrl: './update-auction.component.html',
  styleUrls: ['./update-auction.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UpdateAuctionComponent implements OnInit {
  auctionForm!: FormGroup;
  auctionId!: number;
  auctionName: string = '';

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auctionId = Number(this.route.snapshot.paramMap.get('id'));

    this.auctionForm = this.fb.group({
      name: [''],
      description: [''],
      promoted: [false],
      bitNowPrice: [0],
      buyNowPrice: [0],
      startBiddingDate: [''],  // string
      endBiddingDate: [''],    // string
      numbersOfViews: [''],
      categoryName: ['']
    });

    this.auctionService.getAuctionById(this.auctionId).subscribe({
      next: (data) => {
        this.auctionForm.patchValue(data);
        this.auctionName = data.name;
      },
      error: (err) => {
        console.error('Eroare la preluarea licitației:', err);
        alert('Eroare la preluarea licitației.');
      }
    });
  }

  onSubmit(): void {
    const formValue = this.auctionForm.value;

    const requestPayload = {
      auction: {
        name: formValue.name,
        description: formValue.description,
        promoted: formValue.promoted === 'Yes',
        bitNowPrice: formValue.bitNowPrice,
        buyNowPrice: formValue.buyNowPrice,
        startBiddingDate: formValue.startBiddingDate,
        endBiddingDate: formValue.endBiddingDate,
        numbersOfViews: formValue.numbersOfViews
      },
      categoryName: formValue.categoryName
    };

    this.auctionService.updateAuction(this.auctionId, requestPayload).subscribe({
      next: () => {
        alert('Licitația a fost actualizată!');
        this.router.navigate(['/my-auctions']);
      },
      error: () => {
        alert('A apărut o eroare la actualizare.');
      }
    });
  }
}
