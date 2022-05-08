// compoenents/movimentacao-new.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CorrentistaService } from 'src/app/services/correntista.service';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-movimentacao-new',
  templateUrl: './movimentacao-new.component.html',
  styleUrls: ['./movimentacao-new.component.css']
})
export class MovimentacaoNewComponent implements OnInit {
  correntistas: any;
  correntista: any;

  dataHora: any;
  descricao: any;
  valor: any;
  tipo: any;



  constructor(
    private movimentacaoService: MovimentacaoService,
    private correntistaService: CorrentistaService
  ) { }


  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', { static: false })
  staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    this.exibirCorrentistas();
    setTimeout(() => this.staticAlert.close(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }


  public changeSuccessMessage() { this._success.next('Movimentação cadastrada com sucesso!'); }

  exibirCorrentistas(): void {
    this.correntistaService.list()
      .subscribe(
        data => {
          this.correntistas = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  save(): void {
    console.log(this.correntista)
    const movimentacao = {
      valor: this.valor,
      descricao: this.descricao,
      tipo: this.tipo,
      idConta: this.correntista.id,
      dataHora: this.dataHora

    };
    console.log(movimentacao);
    this.movimentacaoService.create(movimentacao)
      .subscribe(
        response => {
          console.log(response);
          this.changeSuccessMessage();
          this.clearFields();
        },
        error => {
          this.changeSuccessMessage();
          console.log(error);
        });
  }

  clearFields(): void {
    this.valor = 0;
    this.tipo = '';
    this.descricao = '';
  }



}