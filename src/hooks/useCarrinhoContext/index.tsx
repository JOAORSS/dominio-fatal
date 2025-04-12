"use client"

import { CarrinhoContext } from "@/context/carrinhoContext";
import { Produto } from "@/module/produtoApi";
import { enumTamanhoLetras } from "@/utils/enumTamanhos";
import { useContext } from "react";


export default function useCarrinhoContext() {
    const context = useContext(CarrinhoContext);

    if (!context) {
        throw new Error("useCarrinhoContext must be used within a CarrinhoProvider");
    }

    const { carrinho, setCarrinho } = context;
    
    function adicionarUmProdutoCarrinho(
        produto: Produto, 
        corSelecionada: string, 
        tamanhoSelecionado: string
    ): void {
        const produtoExistente = carrinho.find(
            (p) => p.id === produto.id &&
            p.cor === corSelecionada && 
            p.tamanho === tamanhoSelecionado
        );

        if (produtoExistente) {
            const newCarrinho = carrinho.map((p) =>
                p.id === produto.id &&
                p.cor === corSelecionada && 
                p.tamanho === tamanhoSelecionado &&
                p.quantidade < (produto.cores.find((c) =>
                    c.cor === corSelecionada)?.tamanhos.find((t) =>
                        t.tamanho === enumTamanhoLetras(tamanhoSelecionado))?.quantidade as number ?? 0)
                    ? { ...p, quantidade: p.quantidade + 1 }
                    : p
            );
            setCarrinho(newCarrinho);
        } else {
            setCarrinho(
                [...carrinho, 
                    { 
                        ...produto, 
                        quantidade: 1, 
                        cor: corSelecionada, 
                        tamanho: tamanhoSelecionado,
                        objeto_de_venda: 
                            { 
                                produto_id: produto.id, 
                                cor_id: (produto.cores.find((c) => c.cor === corSelecionada)?.cor_id) as number, 
                                tamanho_id: (produto.cores.find((c) => 
                                    c.cor === corSelecionada)?.tamanhos.find((t) => 
                                        t.tamanho === enumTamanhoLetras(tamanhoSelecionado))?.tamanho) as number, 
                                quantidade: 1 } 
                    }
                ]);
        }
    }

    function adicionarQuantidadeCarrinho(
        produto: Produto, 
        corSelecionada: string, 
        tamanhoSelecionado: string,
    ): void {
        const produtoExistente = carrinho.find(
            (p) => p.id === produto.id &&
            p.cor === corSelecionada &&
            p.tamanho === tamanhoSelecionado
        );

        if (produtoExistente) {
            const newCarrinho = carrinho.map((p) =>
                p.id === produto.id && 
                p.cor === corSelecionada && 
                p.tamanho === tamanhoSelecionado &&
                p.quantidade < (produto.cores.find((c) =>
                    c.cor === corSelecionada)?.tamanhos.find((t) =>
                        t.tamanho === enumTamanhoLetras(tamanhoSelecionado))?.quantidade as number)
                    ? { 
                        ...p, 
                        quantidade: p.quantidade + 1, 
                        objeto_de_venda: 
                            { 
                                ...p.objeto_de_venda, 
                                quantidade: p.objeto_de_venda.quantidade + 1 
                            } 
                        }
                    : p
            );
            setCarrinho(newCarrinho);
        }
    }

    function excluiProdutoCarrinho(
        produto: Produto,
        corSelecionada: string, 
        tamanhoSelecionado: string
    ): void {
        const newCarrinho = carrinho.filter(
            (p) => !(p.id === produto.id && 
                p.cor === corSelecionada && 
                p.tamanho === tamanhoSelecionado)
        );
        setCarrinho(newCarrinho);
    }

    function removeUmProdutoCarrinho(
        produto: Produto,
        corSelecionada: string, 
        tamanhoSelecionado: string
    ): void {
        const produtoExistente = carrinho.find((p) => 
            p.id === produto.id && 
            p.cor === corSelecionada && 
            p.tamanho === tamanhoSelecionado);

        if (produtoExistente?.quantidade === 1) {
            excluiProdutoCarrinho(produto, corSelecionada, tamanhoSelecionado);
        } else {
            const newCarrinho = carrinho.map((p) =>
                p.id === produto.id && 
                p.cor === corSelecionada && 
                p.tamanho === tamanhoSelecionado 
                    ? { 
                        ...p, 
                        quantidade: p.quantidade - 1,
                        objeto_de_venda: 
                        { 
                            ...p.objeto_de_venda, 
                            quantidade: p.objeto_de_venda.quantidade - 1 
                        } 
                    }
                    : p
            );
            setCarrinho(newCarrinho);
        }
    }

    function editaQuantidadeProdutoCarrinho(
            produto: Produto, 
            quantidade: number,
            corSelecionada: string,
            tamanhoSelecionado: string
        ): void {
        const produtoExistente = carrinho.find((p) => 
            p.id === produto.id && 
            p.cor === corSelecionada && 
            p.tamanho === tamanhoSelecionado);

        if (produtoExistente) {
            const newCarrinho = carrinho.map((p) =>
                p.id === produto.id && 
                p.cor === corSelecionada && 
                p.tamanho === tamanhoSelecionado 
                    ? { ...p, quantidade } 
                    : p
            );
            setCarrinho(newCarrinho);
        }
    }
    
    return {
        carrinho,
        setCarrinho,
        editaQuantidadeProdutoCarrinho,
        adicionarUmProdutoCarrinho,
        adicionarQuantidadeCarrinho,
        excluiProdutoCarrinho,
        removeUmProdutoCarrinho
    }
}