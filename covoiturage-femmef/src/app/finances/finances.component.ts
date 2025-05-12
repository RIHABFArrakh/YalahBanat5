import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../core/services/finance.service';
import { DecimalPipe } from '@angular/common';  // Pour formater les montants

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css'],
  providers: [DecimalPipe]
})
export class FinancesComponent implements OnInit {
  soldeActuel = 0;
  paiementsEnAttente = 0;
  prochaineDatePaiement = '';
  totalRevenus = 0;
  totalRetire = 0;

  constructor(private financeService: FinanceService, private decimalPipe: DecimalPipe) {}

  ngOnInit() {
    // Par exemple, obtenir le total des finances pour une conductrice
    this.getTotalByConductriceId(1);  // Remplace par un ID valide ou dynamique
  }

  // Méthode pour obtenir le total des finances d'une conductrice
  getTotalByConductriceId(conductriceId: number) {
    this.financeService.getTotalByConductriceId(conductriceId).subscribe({
      next: (data: number) => {
        this.soldeActuel = data;  // Assigner la réponse au solde actuel
        console.log('Total des finances:', data);
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération du total des finances:', err);
      }
    });
  }

  // Méthode pour formater les nombres avec DecimalPipe
  formatNumber(value: number): string {
    return this.decimalPipe.transform(value, '1.2-2')!;
  }

  retirerFonds() {
    console.log('Fonction de retrait appelée');
    // Implémentation réelle à ajouter ici
  }

  telechargerCSV() {
    console.log('Export CSV demandé');
    // Implémentation réelle à ajouter ici
  }

  telechargerPDF() {
    console.log('Export PDF demandé');
    // Implémentation réelle à ajouter ici
  }
}
