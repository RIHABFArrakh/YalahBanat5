import { Component, Input, OnInit } from '@angular/core';
import { EvaluationService } from '../services/evaluation.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  @Input() voyageId!: number;
  @Input() passagerId!: number;
  @Input() conductriceId!: number;

  evaluation = {
    voyageId: 0,
    passagerId: 0,
    conductriceId: 0,
    note: 5,
    commentaire: ''
  };

  message = '';

  constructor(private evaluationService: EvaluationService) { }

  ngOnInit(): void {
    // Initialiser les ids reçus de la page parente
    this.evaluation.voyageId = this.voyageId;
    this.evaluation.passagerId = this.passagerId;
    this.evaluation.conductriceId = this.conductriceId;
  }

  submitEvaluation(): void {
    if (this.evaluation.note < 1 || this.evaluation.note > 5) {
      this.message = 'Veuillez sélectionner une note entre 1 et 5.';
      return;
    }

    this.evaluationService.createEvaluation(this.evaluation).subscribe({
      next: () => this.message = 'Merci pour votre évaluation !',
      error: () => this.message = 'Erreur lors de l’envoi, veuillez réessayer.'
    });
  }
}
